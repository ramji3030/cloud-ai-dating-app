# System Architecture

```mermaid
graph LR
  subgraph Frontend
    FE(React App)
  end
  subgraph Backend
    Auth(Auth Service)
    User(User Service)
    Match(Matchmaking)
    Chat(Chat Service)
    Notif(Notification)
  end
  subgraph AI
    AI(ML Engine)
  end
  subgraph Infra
    DB(MongoDB)
    Redis(Redis)
    S3((AWS S3))
    K8s([Kubernetes])
    AWS([AWS Cloud])
  end
  FE -- API --> Auth
  FE -- API --> User
  FE -- API --> Match
  FE -- WS --> Chat
  Auth -- DB --> DB
  User -- DB --> DB
  Match -- DB --> DB
  Match--->AI
  Chat -- Redis --> Redis
  User -- S3 --> S3
  All -- K8s --> AWS
end
```

*Note: Update diagram.png when visual graphic is available.*
