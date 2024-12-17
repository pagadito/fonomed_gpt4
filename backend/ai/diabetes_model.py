import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_diabetes

# Cargar datos de ejemplo
data = load_diabetes()
X, y = data.data, (data.target > 140).astype(int)  # Riesgo alto si el target es mayor a 140

# Entrenar el modelo
model = LogisticRegression()
model.fit(X, y)

# Guardar el modelo entrenado
with open('diabetes_model.pkl', 'wb') as file:
    pickle.dump(model, file)
