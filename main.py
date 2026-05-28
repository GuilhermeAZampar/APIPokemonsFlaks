from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import redis
import os
import json


load_dotenv()

app=Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"]=os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

db=SQLAlchemy(app)

REDIS_HOST=os.getenv("REDIS_HOST","localhost")
REDIS_PORT=int(os.getenv("REDIS_PORT","6379"))

redis_client=redis.Redis(host=REDIS_HOST,port=REDIS_PORT,db=0,decode_responses=True)

class PokemonDB(db.Model):
    __tablename__="Pokemons"

    id_pokemon=db.Column(db.Integer,primary_key=True,index=True)
    nome_pokemon=db.Column(db.String(100),index=True)
    tipo_pokemon=db.Column(db.String(100),index=True)
    nivel_pokemon=db.Column(db.Integer,index=True)


with app.app_context():
    db.create_all()


def salvar_redis(id_pokemon,pokemon):
    redis_client.set(f"pokemon:{id_pokemon}",json.dumps(pokemon))


def deletar_redis(id_pokemon):
    redis_client.delete(f"pokemon:{id_pokemon}")

def limpar_cache():
    for keys in redis_client.keys("pokemon:page=*"):
        redis_client.delete(keys)


@app.route("/debug/redis")
def debug():
    chave=redis_client.keys("*")
    pokemons=[]
    for chaves in chave:
        valor=redis_client.get(chaves)
        ttl=redis_client.ttl(chaves)
        pokemons.append({"id_pokemon":chaves,"valor":valor,"ttl":ttl})
    
    return jsonify(pokemons)






@app.route("/")
def home():
    return jsonify({"message":"Hello World"})



@app.route("/pokemons",methods=["GET"])
def listar():
    page=int(request.args.get("page",1))
    limit=int(request.args.get("limit",10))

    if page<1 or limit<1:
        return jsonify({"message":"Erro de pagincao"}),404
    
    cache_key=f"pokemon:page={page}&limit={limit}"
    cached=redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    pokedb=PokemonDB.query.offset((page-1)*limit).limit(limit).all()

    if not pokedb:
        return jsonify({"message":"Erro nenhum pokemon encontrado"}),404
    
    resposta={"page":page,"limit":limit,"pokemons":[{"id_pokemon":poke.id_pokemon,"nome_pokemon":poke.nome_pokemon,"tipo_pokemon":poke.tipo_pokemon,"nivel_pokemon":poke.nivel_pokemon}for poke in pokedb]}
    redis_client.setex(cache_key,30,json.dumps(resposta))
    return jsonify(resposta)


@app.route("/adicionar",methods=["POST"])
def adicionar():
    dados=request.json

    pokedb=PokemonDB.query.filter_by(nome_pokemon=dados["nome_pokemon"],tipo_pokemon=dados["tipo_pokemon"],nivel_pokemon=dados["nivel_pokemon"]).first()

    if pokedb:
        return jsonify({"message":"Erro pokemon ja cadastrado"}),404
    
    novo_pokemon=PokemonDB(nome_pokemon=dados["nome_pokemon"],tipo_pokemon=dados["tipo_pokemon"],nivel_pokemon=dados["nivel_pokemon"])
    
    db.session.add(novo_pokemon)
    db.session.commit()
    salvar_redis(novo_pokemon.id_pokemon,dados)
    limpar_cache()
    return jsonify({"message":f"O {novo_pokemon.nome_pokemon} foi adicionado com sucesso"})




@app.route("/atualizar_nivel/<int:id_pokemon>",methods=["PUT"])
def atualizar_nivel(id_pokemon):
    dados=request.json

    pokedb=PokemonDB.query.filter_by(id_pokemon=id_pokemon).first()

    if not pokedb:
        return jsonify({"message":"Erro pokemon nao encontrado"}),404
    
    nivel_antigo=pokedb.nivel_pokemon

    pokedb.nivel_pokemon=dados["nivel_pokemon"]
    db.session.commit()
    salvar_redis(pokedb.id_pokemon,dados)
    limpar_cache()
    return jsonify({"message":f"O {pokedb.nome_pokemon} tinha o nivel de {nivel_antigo} agora evolui para {pokedb.nivel_pokemon}"})




@app.route("/evoluir/<int:id_pokemon>",methods=["PUT"])
def evoluir(id_pokemon):
    dados=request.json

    pokedb=PokemonDB.query.filter_by(id_pokemon=id_pokemon).first()
    if not pokedb:
        return jsonify({"message":"Erro pokemon nao encontrado"}),404
    
    pokedb.nome_pokemon=dados["nome_pokemon"]
    pokedb.tipo_pokemon=dados["tipo_pokemon"]
    pokedb.nivel_pokemon=dados["nivel_pokemon"]
    db.session.commit()

    salvar_redis(pokedb.id_pokemon,dados)
    limpar_cache()
    return jsonify({"message":f"O {pokedb.nome_pokemon} evolui"})





@app.route("/deletar/<int:id_pokemon>",methods=["DELETE"])
def deletar(id_pokemon):
    pokedb=PokemonDB.query.filter_by(id_pokemon=id_pokemon).first()
    if not pokedb:
        return jsonify({"message":"Erro pokemon nao encontrado"}),404
    
    db.session.delete(pokedb)
    db.session.commit()
    deletar_redis(id_pokemon)
    limpar_cache()
    return jsonify({"message":"O foi excluido "})



if __name__=="__main__":

    app.run(host="0.0.0.0",port=5000,debug=True)