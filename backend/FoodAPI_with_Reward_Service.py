from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json
import mysql.connector

fooddb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Vino@123',
    database='fooddb'
)

foodcursor = fooddb.cursor()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/foods')
@cross_origin()
def get_foods():
    foodcursor.execute('select * from foods')
    foodresult = foodcursor.fetchall()
    foods = {}
    for food in foodresult:
        foods[food[0]] = {'name': food[1], 'description': food[2], 'price': food[3]}
    return jsonify(foods)

@app.route('/food/<uid>/rewards')
@cross_origin()
def get_food_rewards(uid):
    rewards = read_rewards(uid, True)
    return jsonify(rewards,)

@app.route('/cloth/<uid>/rewards')
@cross_origin()
def get_cloth_rewards(uid):
    rewards = read_rewards(uid, True)
    return jsonify(rewards)

def read_rewards(uid, isfood):
    foodcursor = fooddb.cursor()
    foodcursor.execute('select * from rewardpoints where uid = %s and isfood = %s',(uid, isfood))
    rewardresult = foodcursor.fetchall()
    rewards = []
    for reward in rewardresult:
        rewards.append({'oid': reward[0], 'ordertotal': reward[3], 'rewards': reward[4]})
    return rewards

@app.route('/placeorder', methods = ['POST'])
@cross_origin()
def order_foods():
    order = request.json
    sql = 'insert into rewardpoints(uid, isfood, ordertotal, rewards) values (%s,%s,%s,%s)'
    val = (order['uid'], order['isfood'], order['orderedAmount'],calculateRewards(order['orderedAmount']))
    foodcursor.execute(sql, val)
    fooddb.commit()
    return jsonify('order successful')

def calculateRewards(totalAmount):
    if totalAmount < 50:
        return totalAmount / 10 
    elif totalAmount > 50 and totalAmount < 100:
        return totalAmount / 8 
    else:
        return totalAmount / 5

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)