aars
====

Análise em Ação para Redes Sociais


Utilidades
----------

* Etiquetação de tweets e personas
* Confronto das estruturas observadas com estruturas naturais
* Visualizações configuráveis, interativas e de fácil acesso (e.g. programação visual)
* Modos artísticos, dançantes (dinâmicos) e gamificados para facilitar aquisição de conhecimento a partir dos dados
* Integração com dados linkados (triplas RDF)
* Doação de dados (das redes sociais) para composição de uma base pública (com as eventuais/necessários anonimizações e tratamentos) 
* Tecnologias e conhecimentos abertos


Componentes
-----------

### Puxador e Streamer de tweets
Funcionando no heroku, para a hashtag especificada no
arquivo hashtag.txt.

### Processador e servidor de dados em Flask
Também funcionando no Heroku, processa os dados (p.ex. tweets) e os entrega em JSON, é suporte aos frontends, como o descrito no tópico seguinte.

### Frontend em Meteor
Para navegação pelos dados puxados das hashtags.
Com logins pelas redes sociais usuais, para puxar dados delas ou
passar o access token para o servidor Flask.

Anotações
---------
* Para colocar login de facebook no meteor:
  meteor add login-ui
  meteor add login-facebook
No .html do app, basta colocar:
  {{> loginButtons}}
* Integrar identi.ca e diaspora, com urgencia
* Pensar em integrar com emails

Contato
-------
Canal #labmacambira na rede Freenode (IRC).
