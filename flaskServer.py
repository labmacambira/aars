#-*- coding: utf-8 -*-
from flask import Flask, render_template, make_response, session, redirect, url_for, escape, request,jsonify,Response   
import pymongo, __builtin__, datetime, string
from dateutil import parser
import time as T, networkx as x, json # json.dumps
#import MySQLdb, cPickle, numpy as n

from maccess import mdc as U
HTAG="#testeteste"
HTAG_=HTAG.replace("#","NEW")
U=U.u1

app = Flask(__name__)

@app.route("/")
def hello_world():
    client=pymongo.MongoClient(U)
    db = client[U.split("/")[-1]]
    C = db[HTAG_] #collection
    msgs=[i for i in C.find()]
    info=[(mm["user"]["screen_name"],mm["text"],mm["created_at"]) for mm in msgs]
    text_block=string.join([str(ii) for ii in info],"<br />")
    return text_block

@app.route("/jsonMe/")
def jsonMe():
    client=pymongo.MongoClient(U)
    db = client[U.split("/")[-1]]
    C = db[HTAG_] #collection
    msgs=[i for i in C.find()]
    info=[(mm["user"]["screen_name"],mm["text"],mm["created_at"]) for mm in msgs]
    return json.dumps(info)

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')
