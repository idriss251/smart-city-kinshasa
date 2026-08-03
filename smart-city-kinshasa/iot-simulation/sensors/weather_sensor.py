import json, random, time
import paho.mqtt.client as mqtt
communes=['Kinshasa','Gombe','Lingwala','Bandalungwa','Limete','Matonge','Kalamu','Mont Ngafula','Ngaliema','Kimbanseke']
client=mqtt.Client()
client.connect('localhost',1883,60)
while True:
    for i in range(1, 6):
        data={'rainMm': round(random.random()*80,2), 'temperatureC': round(22+random.random()*10,1), 'commune': random.choice(communes), 'timestamp': time.time()}
        client.publish('smartcity/weather', json.dumps(data))
        print(data)
    time.sleep(5)
