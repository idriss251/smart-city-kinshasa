import json, random, time
import paho.mqtt.client as mqtt
communes=['Kinshasa','Gombe','Lingwala','Bandalungwa','Limete','Matonge','Kalamu','Mont Ngafula','Ngaliema','Kimbanseke']
client=mqtt.Client()
client.connect('localhost',1883,60)
while True:
    for i in range(1, 21):
        data={'binId': i, 'commune': random.choice(communes), 'fillLevel': random.randint(5, 100), 'latitude': -4.33 + random.random()/10, 'longitude': 15.30 + random.random()/10, 'timestamp': time.time()}
        client.publish('smartcity/waste/bins', json.dumps(data))
        print(data)
    time.sleep(5)
