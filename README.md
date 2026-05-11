# README.md — Projet Microservices Étudiants

````markdown
# 🎓 Projet Microservices Étudiants

Plateforme microservices de gestion des étudiants développée avec Spring Boot, Spring Cloud, Kafka, Docker et outils d’observabilité (Prometheus, Grafana, ELK).

---

# 📌 Architecture du projet

Le système est composé des microservices suivants :

| Service | Description |
|---|---|
| api-spring-boot | Gestion des étudiants et départements |
| grading-service | Gestion des notes |
| notification-service | Notifications Kafka |
| api-gateway | Point d’entrée unique |
| eureka-server | Service Discovery |
| postgres | Base de données PostgreSQL |
| redis | Cache Redis |
| kafka | Broker Kafka |
| zookeeper | Coordination Kafka |
| prometheus | Collecte des métriques |
| grafana | Dashboard monitoring |
| elasticsearch | Stockage centralisé des logs |
| logstash | Pipeline de logs |
| kibana | Visualisation des logs |
| mongodb | Base MongoDB pour auth-service |
| auth-service | Authentification |

---

# 🏗️ Architecture technique

```text
Frontend
   |
API Gateway
   |
-------------------------------------------------
|               |               |               |
Etudiant    Grading       Notification     Auth
Service      Service        Service       Service
   |
PostgreSQL + Redis

Kafka <---- Communication asynchrone

Prometheus + Grafana ---- Monitoring
ELK Stack -------------- Logs centralisés
````

---

# 📂 Structure du projet

```text
projet-etudiants/
│
├── api-gateway/
├── api-spring-boot/
├── grading-service/
├── notification-service/
├── eureka-server/
├── auth-service/
├── frontend/
│
├── observability/
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── logstash/
│       └── pipeline/
│           └── logstash.conf
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Technologies utilisées

## Backend

* Java 17
* Spring Boot 3
* Spring Cloud
* Spring Gateway
* Spring Eureka
* Spring Data JPA
* Spring Kafka
* Spring Actuator
* Redis
* PostgreSQL
* MongoDB

## Frontend

* Next.js
* React

## DevOps & Observabilité

* Docker
* Docker Compose
* Kafka
* Zookeeper
* Prometheus
* Grafana
* Elasticsearch
* Logstash
* Kibana

---

# ⚙️ Prérequis

Installer :

* Docker Desktop
* Docker Compose
* Java 17
* Maven
* Git

---

# 🔧 Configuration

Créer un fichier `.env` :

```env
POSTGRES_DB=etudiants_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432

REDIS_PORT=6379

ETUDIANT_SERVICE_PORT=8081
GRADING_SERVICE_PORT=8082
GATEWAY_PORT=8080
EUREKA_PORT=8761
FRONTEND_PORT=3000

DB_INTERNAL_URL=jdbc:postgresql://postgres:5432/etudiants_db

REDIS_INTERNAL_HOST=redis
REDIS_INTERNAL_PORT=6379

EUREKA_SERVICE_URL=http://eureka-server:8761/eureka
```

---

# ▶️ Lancement du projet

## Construire et lancer tous les services

```bash
docker compose up --build
```

## Vérifier les conteneurs

```bash
docker ps
```

---

# 🌐 URLs des services

| Service          | URL                                                                            |
| ---------------- | ------------------------------------------------------------------------------ |
| Eureka           | [http://localhost:8761](http://localhost:8761)                                 |
| API Gateway      | [http://localhost:8080](http://localhost:8080)                                 |
| Swagger Etudiant | [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html) |
| Swagger Grading  | [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html) |
| Prometheus       | [http://localhost:9090](http://localhost:9090)                                 |
| Grafana          | [http://localhost:3002](http://localhost:3002)                                 |
| Kibana           | [http://localhost:5601](http://localhost:5601)                                 |

---

# 📡 Communication Kafka

## Topics utilisés

| Topic            | Description                    |
| ---------------- | ------------------------------ |
| etudiant-created | Notification création étudiant |
| note-created     | Notification ajout note        |

## Vérifier les topics

```bash
docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --list
```

---

# 📬 Test des notifications

## Créer un étudiant

```bash
curl -X POST http://localhost:8080/api/etudiants ^
-H "Content-Type: application/json" ^
-d "{\"cin\":\"12345678\",\"nom\":\"Ali\",\"email\":\"ali@test.com\",\"anneePremiereInscription\":2024}"
```

## Vérifier les logs

```bash
docker logs -f notification-service
```

Résultat attendu :

```text
[NOTIFICATION] Nouvel étudiant inscrit : Ali
```

---

# 📊 Observabilité

# ✅ Actuator

Endpoints disponibles :

```text
/actuator/health
/actuator/prometheus
/actuator/metrics
```

Exemple :

```bash
curl http://localhost:8081/actuator/health
```

---

# 📈 Prometheus

## Vérifier les targets

```text
http://localhost:9090/targets
```

Targets attendus :

* etudiant-service
* grading-service
* notification-service
* api-gateway

---

# 📉 Grafana

## Connexion

```text
Username: admin
Password: admin
```

## Ajouter datasource

```text
http://prometheus:9090
```

## Dashboards recommandés

* JVM Micrometer
* Spring Boot Statistics

---

# 📜 Logs centralisés — ELK

## Kibana

```text
http://localhost:5601
```

Créer index pattern :

```text
microservices-logs-*
```

Puis :

```text
Discover
```

---

# 🧪 Tests utiles

## Vérifier Kafka

```bash
docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --list
```

## Vérifier health services

```bash
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
```

---

# 🛠️ Commandes utiles

## Arrêter les services

```bash
docker compose down
```

## Supprimer volumes

```bash
docker compose down -v
```

## Voir logs

```bash
docker logs -f etudiant-service
docker logs -f grading-service
docker logs -f notification-service
```

---

# 👨‍💻 Auteur

Projet réalisé dans le cadre du module :

```text
Architecture Microservices & Observabilité
```

---

# 📄 Licence

Projet pédagogique universitaire.

```
```
