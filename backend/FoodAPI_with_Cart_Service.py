from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
import mysql.connector
import requests

clothdb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Vino@123',
    database='clothdb'
)

clothcursor = clothdb.cursor()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/cloths')
@cross_origin()
def get_cloths():
    clothcursor.execute('select * from cloths')
    clothresult = clothcursor.fetchall()
    cloths = {}
    for cloth in clothresult:
        cloths[cloth[0]] = {'name': cloth[1], 'description': cloth[2], 'price': cloth[3]}
    return jsonify(cloths)

@app.route('/food/<uid>/carts')
@cross_origin()
def get_food_carts(uid):
    carts = read_carts(uid, True)
    return jsonify(carts)

@app.route('/cloth/<uid>/carts')
@cross_origin()
def get_cloth_carts(uid):
    carts = read_carts(uid, False)
    return jsonify(carts)

def read_carts(uid, isfood):
    clothcursor.execute('select * from carts where isordered = false and uid=%s and isfood=%s',(uid,isfood))
    cartresult = clothcursor.fetchall()
    carts = []
    for cart in cartresult:
        carts.append({'cid': cart[0], 'pid': cart[2], 'quantity': cart[4]})
    return carts

@app.route('/addtocart', methods = ['POST'])
@cross_origin()
def add_to_cart():
    product = request.json
    isfood = product['product'] == 'food'
    sql = 'insert into carts(uid,pid,isfood,quantity,isordered) values(%s,%s,%s,%s,%s)'
    val = (product['uid'], product['pid'], isfood, product['quantity'], False)
    clothcursor.execute(sql,val)
    clothdb.commit()
    return jsonify(clothcursor.lastrowid)

@app.route('/updatecart', methods = ['POST'])
@cross_origin()
def update_cart():
    product = request.json
    sql = 'update carts set quantity = %s where cid = %s'
    val = (product['quantity'], product['cid'])
    clothcursor.execute(sql,val)
    clothdb.commit()
    return jsonify(clothcursor.rowcount)

@app.route('/removefromcart', methods = ['POST'])
@cross_origin()
def remove_cart():
    product = request.json
    sql = 'delete from carts where cid = %s'
    val = (product['cid'],)
    clothcursor.execute(sql,val)
    clothdb.commit()
    return jsonify(clothcursor.rowcount)

@app.route('/placeorder', methods = ['POST'])
@cross_origin()
def order_products():
    order = request.json
    for product in order['orderedItems']:
        sql = 'update carts set isordered = %s where cid = %s'
        val = (True, product['cartid'])
        clothcursor.execute(sql,val)
    clothdb.commit()
    res = requests.post('http://localhost:5001/placeorder',json={'uid': order['uid'], 'isfood':order['isfood'], 'orderedAmount':  order['orderedAmount']})
    return jsonify(res.text)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)