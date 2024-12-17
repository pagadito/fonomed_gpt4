import pickle
import sys
import json

# Cargar el modelo entrenado
with open('ai/diabetes_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Leer las características desde el argumento
features = json.loads(sys.argv[1])

# Realizar predicción
prediction = model.predict([features])[0]
print(prediction)
