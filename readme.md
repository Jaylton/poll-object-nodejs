# Poll Object (Lifecycle Management Pattern) Client-Server Application with NodeJS
Este projeto demonstra a implementação do Poll Object Pattern em uma aplicação simples de cliente-servidor. O cliente inicia uma operação assíncrona no servidor (como uma query de banco de dados) e usa o Poll Object para consultar periodicamente o status da operação até que o resultado esteja disponível.

## Estrutura do Projeto
- **server.js**: Servidor que processa operações assíncronas e fornece o status da execução ao cliente.
- **client.js**: Cliente que inicia a operação assíncrona no servidor e usa o Poll Object para acompanhar o progresso da execução.
- **pool.js**: Implementação de um pool de objetos que gerencia conexões.
- **connection.js**: Simula uma conexão de banco de dados que processa queries.

## Como Funciona
1. O cliente envia uma requisição ao servidor para iniciar uma operação (exemplo: uma query de banco de dados).
2. O servidor processa a operação de forma assíncrona e retorna um requestId para o cliente.
3. O cliente cria um Poll Object e usa esse objeto para consultar periodicamente o status da operação no servidor.
4. Quando a operação estiver concluída, o servidor responde com o resultado, e o cliente exibe esse resultado, parando o polling.


## Requisitos
- Node.js (versão 12 ou superior).

## Como Executar
1. Clone este repositório:
  ```
  git clone https://github.com/Jaylton/poll-object-nodejs.git
  cd poll-object-nodejs
  ```

2. Inicie o servidor:
  ```
  node server.js
  ```
  O servidor será iniciado e escutará na porta 3000.

3. Em outra janela de terminal, inicie o cliente:
  ```
  node client.js
  ```
  O cliente enviará uma requisição para iniciar uma operação no servidor e usará o Poll Object para consultar periodicamente o status da operação até que o resultado seja retornado.
