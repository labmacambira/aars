aars
====

Análise em Ação para Redes Sociais


Utilidades
----------

* Etiquetação de tweets e personas
* Confronto das estruturas observadas com estruturas naturais
* Visualizações configuráveis, interativas e de fácil acesso (e.g. programação visual)
* Possibilidades interativas, artísticas e gamificadas para facilitar aquisição de conhecimento
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
  meteor add accounts-ui
  meteor add accounts-facebook
No .html do app, basta colocar:
  {{> loginButtons}}
No browser, o html vai exibit botão para configurar.
Vai no developers do fb, cria app, pega a chave e a secreta,
coloca a Site URL correta (p.ex: http://localhost:3000 ou http://aars.meteor.com, no "Settings". Deixa ele live no "Status & Review". Deve estar fazendo login normalmente.
auth fb do gk no localhost:
    id: 670669796332705
    key: 0f24e7e8ad8028f609319e390794e770
no aars.meteor.com:
    id: 293574867488230
    key: a125ab84e3e4a336011cdd40a89865d2
p zerar:
    $ meteor mongo blah.meteor.com
    > db.meteor_accounts_loginServiceConfiguration.remove()
* Integrar identi.ca e diaspora, com urgencia
* Pensar em integrar com emails

Contato
-------
Canal #labmacambira na rede Freenode (IRC).
