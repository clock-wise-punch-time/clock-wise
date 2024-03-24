# Clock Wise

A Hackaton Company SA, uma empresa de grande porte com mais de 100.000 colaboradores e que atende diversas áreas, inclusive tecnologia, está em um ponto
de transição crucial. Atualmente, está utilizando um sistema de ponto eletrônico
terceirizado, mas devido a questões de qualidade e custos mensais significativos
por usuário, a diretoria decidiu por construir o próprio sistema de ponto eletrônico
interno. E, para que atenda as diversas filiais e pontos de trabalho dos colaboradores, este novo sistema será baseado em nuvem.
A decisão de migrar para um sistema interno e em nuvem é motivada por várias
razões. A primeira é relacionada à qualidade do serviço fornecido pelo sistema
terceirizado, que tem sido insatisfatória, com problemas frequentes de desempenho e disponibilidade. Somando-se a isso, os custos mensais por usuário estão
se tornando proibitivos, especialmente considerando a quantidade de colaboradores. E outro ponto importante é a possibilidade de controlar a evolução do software, implementando as melhorias necessárias sempre que desejado.
Ao construir o próprio sistema em nuvem, espera-se não apenas economizar custos no longo prazo, mas também melhorar a qualidade e a confiabilidade do registro de ponto para os colaboradores. A nuvem oferece benefícios significativos em
termos de escalabilidade, disponibilidade e segurança, tornando-a a escolha
ideal para o novo sistema.
Este projeto envolverá a criação de um sistema de ponto eletrônico robusto, escalável e seguro que possa suportar a carga de nossa grande força de trabalho. O
novo sistema irá implementar as funcionalidades do sistema atual, e terá uma série de recursos adaptados à realidade da nossa empresa, incluindo a autenticação de usuário, registro de ponto, visualização e edição de registros, geração de
relatórios, notificações e integração com outros sistemas.
A transição para a nuvem é um passo importante para o início de grandes modernizações dentro da organização.

## Requisitos Funcionais
1. Autenticação de Usuário: O sistema deve permitir que os usuários
se autentiquem usando um nome de usuário ou matrícula e senha.
2. Registro de Ponto: O sistema deve permitir que os usuários registrem o horário de entrada, intervalos e saída do trabalho. Isso deve incluir a data e a hora exatas do registro. O usuário apenas registra o
evento, e o sistema obtém o horário do momento do registro.
3. Visualização de Registros: O sistema deve permitir que os usuários
visualizem seus registros de ponto. Isso deve incluir todos os detalhes,
como data, hora de entrada, intervalos e saída, e total de horas trabalhadas no dia.
4. Relatórios: O sistema deve ser capaz de gerar o espelho de ponto
mensal com base nos registros de ponto do mês fechado (anterior) e 
enviar esse relatório por e-mail ao solicitante. (Listagem das datas, batimentos de ponto e total de horas trabalhadas)
5. Segurança: O sistema deve garantir que os dados dos usuários sejam armazenados de forma segura e que a privacidade seja mantida.
6. Disponibilidade: O sistema deve estar disponível 24/7 para permitir
que os usuários registrem seu ponto a qualquer momento, e o tempo
de resposta dos serviços de marcação de ponto deve ser de até 5 segundos.

## Requisitos Não-Funcionais
Requisitos não funcionais
1. Desempenho: O sistema deve ser capaz de suportar um grande número de usuários simultâneos sem degradação do desempenho. Deve
ser capaz de processar rapidamente as solicitações de registro de
ponto de todos os 100.000 colaboradores. Horários de pico 9h, 12h as
14h, 18h chegando a picos de quase 1.000 TPS
2. Escalabilidade: O sistema deve ser escalável para acomodar o
crescimento da empresa. Deve ser capaz de lidar com um aumento no
número de usuários sem a necessidade de alterações significativas na
arquitetura do sistema, e com nenhuma ação manual.
3. Disponibilidade: O sistema deve ter alta disponibilidade, garantindo que esteja operacional 24/7 com um nível de desempenho adequado. Deve haver redundância suficiente para garantir que o sistema
continue funcionando mesmo em caso de falha de um ou mais componentes.
4. Segurança: O sistema deve seguir as melhores práticas de segurança para proteger os dados dos usuários. Isso inclui criptografia de
dados, autenticação segura e proteção contra-ataques comuns.
5. Integridade dos Dados: O sistema deve garantir a integridade dos
dados, garantindo que os registros de ponto não sejam perdidos, corrompidos ou alterados indevidamente.
6. Manutenibilidade: O sistema deve ser fácil de manter, com código
bem documentado e seguindo as melhores práticas de engenharia de
software.
7. Resiliência: O sistema deve ser capaz de se recuperar rapidamente
de falhas, minimizando o tempo de inatividade.
8. Conformidade: O sistema deve estar em conformidade com todas
as leis e regulamentações relevantes relacionadas à privacidade e proteção de dados.

## Infraestrutura do Projeto
![Diagrama de Infraestrutura do Projeto de Ponto Eletrônico](https://i.imgur.com/9E9RX5i.png)

A infraestrutura do projeto é projetada para garantir escalabilidade, desempenho e segurança. A seguir, detalhamos os componentes principais da nossa infraestrutura:

- **Serviços de Computação**: Utilizamos AWS EKS para hospedar nossos serviços e aplicações, garantindo flexibilidade e escalabilidade.
- **Banco de Dados Relacional**: O RDS é utilizado para gerenciar nossas bases de dados, oferecendo backups automatizados, patching e escalabilidade.
- **Banco de Dados NoSQL**: O MongoDB é utilizado para gerenciar nossos dados não relacionais, oferecendo escalabilidade e desempenho.
- **Banco de dados Caching**: O Redis é utilizado para gerenciar nossos dados em cache, oferecendo desempenho e segurança.
- **Balanceamento de Carga**: O ELB é empregado para distribuir o tráfego de entrada dos serviços provisionados na EKS, melhorando a disponibilidade e a robustez do sistema.
- **Rede**: VPCs são configuradas para fornecer uma seção isolada da nuvem onde podemos lançar recursos da AWS em uma rede virtual que definimos.
- **Segurança**: Grupos de Segurança e IAM são usados para controlar o acesso aos recursos da AWS de forma segura.

Cada componente é cuidadosamente selecionado e configurado para atender aos requisitos de desempenho, escalabilidade e segurança do nosso sistema de ponto eletrônico.

## Arquitetura

![Diagrama de Arquitetura do Projeto de Ponto Eletrônico](https://i.imgur.com/K2jJe9s.png)

Esta seção descreve a arquitetura do projeto de ponto eletrônico, incluindo os componentes, serviços e tecnologias utilizadas.

### Banco de Dados e Armazenamento
Cada serviço possui seu próprio banco de dados, garantindo isolamento e facilidade de manutenção e evolução.

- **Autenticação**: O MongoDB é utilizado para gerenciamento de permissões e usuários
- **Registro de Ponto**: O PostgreSQL utilizado para gerenciamento de registros de ponto
- **Caching**: O Redis é utilizado para gerenciamento de cache
- **Relatórios**: Apesar de não possuir um banco de dados. Arquivos CSV de relatórios são gerados e enviados por e-mail

#### Diagrama do Serviço de Registro de Ponto
![Diagrama de Entidades do Projeto de Ponto Eletrônico](https://i.imgur.com/5aI35Qw.jpg)

### Containerização
Cada serviço possui sua própria conteinerização. Seguindo o princípio de containerização, que são isolados uns dos outros. Isso garante que cada serviço possua seu próprio ambiente de execução, evitando conflitos e garantindo a segurança e a confiabilidade do nosso sistema.

### Fluxo de Autenticação
O processo de autenticação em nosso sistema de ponto eletrônico é realizado através de um microserviço de autenticação dedicado. Este microserviço é responsável por gerar tokens de acesso e refresh tokens para os usuários, garantindo uma camada adicional de segurança e facilitando a gestão de sessões de usuários.

#### Geração de Token e Refresh Token
Quando um usuário realiza o login, o microserviço de autenticação verifica as credenciais fornecidas e, se estiverem corretas, gera um token de acesso JWT (JSON Web Token). Este token é utilizado para autenticar o usuário em solicitações subsequentes ao sistema. Além disso, um refresh token também é gerado e enviado ao usuário. Este refresh token pode ser utilizado para gerar um novo token de acesso quando o atual expirar, sem a necessidade de inserir novamente as credenciais.

#### Captcha
Para aumentar a segurança e prevenir ataques automatizados, implementamos um sistema de captcha que deve ser resolvido pelo usuário durante o processo de login. Isso ajuda a garantir que o login está sendo realizado por uma pessoa real e não por um script automatizado.

#### Tipos de Usuários
Nosso sistema de ponto eletrônico suporta dois tipos principais de usuários: Funcionário e Administrador.

- **Funcionário**: Usuários com este perfil têm acesso às funcionalidades básicas do sistema, como registrar ponto, visualizar seus próprios registros de ponto.

- **Administrador**: Usuários com perfil de administrador possuem acesso a todas as funcionalidades do sistema, incluindo gerar relatórios de registro de pontos de funcionários.

A autenticação e autorização de usuários são fundamentais para garantir a segurança e a integridade dos dados no nosso sistema de ponto eletrônico. Por isso, adotamos as melhores práticas e tecnologias disponíveis para proteger as informações dos nossos usuários.

### Fluxo de Registro de Ponto
O fluxo de registro de ponto em nosso sistema é projetado para ser simples e eficiente, garantindo que os funcionários possam marcar seus horários de entrada e saída com facilidade. Abaixo, detalhamos o processo e algumas regras importantes:

### Registro de Entrada e Saída
- **Registro de Entrada**: Para iniciar o dia de trabalho, o funcionário deve realizar o registro de entrada através do nosso sistema. Isso pode ser feito acessando a funcionalidade de "Iniciar Ponto" na nossa aplicação, que registra automaticamente a hora atual como o horário de início do trabalho.
- **Registro de Saída**: Ao final do dia, o funcionário deve registrar a saída utilizando a funcionalidade "Encerrar Ponto". Assim como no registro de entrada, o sistema registra automaticamente a hora atual como o horário de término do trabalho.

### Consulta de Registros e Regras
Os funcionários têm a possibilidade de consultar seus registros de ponto do dia atual. Isso permite que verifiquem as horas de entrada e saída, além de quaisquer intervalos que possam ter registrado. Essa consulta pode ser realizada acessando a funcionalidade "Ponto do Dia" na nossa aplicação.

#### Regras Importantes
- **Intervalos**: Durante o dia de trabalho, os funcionários podem registrar intervalos (pausas) utilizando a funcionalidade "Iniciar Intervalo". É importante registrar o fim do intervalo através da funcionalidade "Encerrar Intervalo" para garantir a precisão do cálculo da duração total do trabalho.
- **Múltiplos Registros**: O sistema não permite múltiplos registros de entrada sem um registro de saída correspondente. Da mesma forma, não é possível registrar a saída sem ter realizado um registro de entrada no mesmo dia.

Nosso sistema foi desenvolvido com o objetivo de facilitar o processo de registro de ponto, garantindo transparência e precisão nos registros de trabalho dos funcionários. Adotamos as melhores práticas e tecnologias para assegurar a segurança e a integridade dos dados registrados.

### Funcionalidade de Relatórios CSV

A funcionalidade de geração de relatórios CSV em nosso sistema permite aos administradores extrair informações detalhadas sobre os registros de ponto dos funcionários em um formato facilmente acessível e manipulável. Esses relatórios podem incluir dados como horas trabalhadas, intervalos, e registros de entrada e saída.

Para gerar um relatório CSV, o sistema executa uma consulta ao banco de dados, filtrando os registros de ponto conforme os critérios especificados pelo administrador (Inicialmente neste MVP, apenas por período de tempo com um limite de 30 dias). Após a consulta, os dados são formatados em um arquivo CSV, que é então enviado por e-mail ao solicitante.

### Endpoints de Autenticação e Usuário

#### Registrar Novo Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/register`
- **Corpo da Requisição**: JSON com os dados para registro (exemplo: `{ "email": "email@exemplo.com", "senha": "senha123", ... }`)
- **Respostas**:
  - `200`: Usuário registrado com sucesso.
  - `400`: Dados inválidos fornecidos para registro.
  - `500`: Erro interno do servidor.

#### Login do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/login`
- **Corpo da Requisição**: JSON com os dados de login (exemplo: `{ "email": "email@exemplo.com", "senha": "senha123" }`)
- **Respostas**:
  - `200`: Usuário logado com sucesso.
  - `400`: Credenciais inválidas fornecidas.
  - `500`: Erro interno do servidor.

#### Refresh de Tokens de Autenticação
- **Método HTTP**: `POST`
- **Endpoint**: `/refresh`
- **Corpo da Requisição**: JSON com o token de refresh (exemplo: `{ "refreshToken": "token_de_refresh" }`)
- **Respostas**:
  - `200`: Tokens atualizados com sucesso.
  - `400`: Token inválido ou dados inválidos fornecidos para atualização de token.
  - `500`: Erro interno do servidor.

#### Iniciar Processo de Redefinição de Senha
- **Método HTTP**: `POST`
- **Endpoint**: `/forgot/password`
- **Corpo da Requisição**: JSON com o email do usuário (exemplo: `{ "email": "email@exemplo.com" }`)
- **Respostas**:
  - `200`: Processo de redefinição de senha iniciado com sucesso.
  - `400`: Email inválido fornecido.
  - `500`: Erro interno do servidor.

#### Redefinir Senha do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/reset/password`
- **Corpo da Requisição**: JSON com os dados para redefinição de senha (exemplo: `{ "token": "token_de_redefinição", "novaSenha": "senha123" }`)
- **Respostas**:
  - `200`: Senha redefinida com sucesso.
  - `400`: Dados inválidos fornecidos para redefinição de senha.
  - `500`: Erro interno do servidor.

#### Confirmar Email do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/confirm/email`
- **Corpo da Requisição**: JSON com os dados para confirmação de email (exemplo: `{ "token": "token_de_confirmação" }`)
- **Respostas**:
  - `200`: Email confirmado com sucesso.
  - `400`: Dados de confirmação inválidos fornecidos.
  - `500`: Erro interno do servidor.

#### Solicitar Redefinição de Email
- **Método HTTP**: `POST`
- **Endpoint**: `/request/reset/email`
- **Respostas**:
  - `200`: Solicitação de redefinição de email bem-sucedida.
  - `400`: Dados inválidos fornecidos para solicitação de redefinição de email.
  - `500`: Erro interno do servidor.

#### Redefinir Email do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/reset/email`
- **Corpo da Requisição**: JSON com os dados para redefinição de email (exemplo: `{ "token": "token_de_redefinição", "novoEmail": "email@exemplo.com" }`)
- **Respostas**:
  - `200`: Email redefinido com sucesso.
  - `400`: Dados inválidos fornecidos para redefinição de email.
  - `500`: Erro interno do servidor.


### Endpoints da Aplicação de Registro de Ponto

Nossa aplicação possui diversos endpoints que permitem a interação com o sistema de ponto eletrônico. Abaixo, detalhamos os endpoints disponíveis e suas respectivas funcionalidades.

#### Endpoints de Intervalo (Break)

- **Iniciar Intervalo**: Permite ao funcionário iniciar um intervalo (pausa).
  - Método HTTP: `POST`
  - Endpoint: `/break/start`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

- **Encerrar Intervalo**: Permite ao funcionário encerrar um intervalo previamente iniciado.
  - Método HTTP: `POST`
  - Endpoint: `/break/end`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

#### Endpoints de Registro de Ponto (Punch Clock)

- **Registrar Entrada**: Permite ao funcionário registrar o início do seu dia de trabalho.
  - Método HTTP: `POST`
  - Endpoint: `/punch-clock/start`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

- **Registrar Saída**: Permite ao funcionário registrar o término do seu dia de trabalho.
  - Método HTTP: `POST`
  - Endpoint: `/punch-clock/end`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

- **Consultar Ponto do Dia**: Permite ao funcionário consultar os registros de ponto do dia atual.
  - Método HTTP: `GET`
  - Endpoint: `/punch-clock/today?userId=id_do_usuario`

### Códigos de erros

| Código de Erro | Descrição                                           |
|----------------|-----------------------------------------------------|
| 1000           | Erro interno do sistema                             |
| 1001           | Falha ao conectar ao banco de dados                 |
| 1002           | Falha na conexão com o banco de dados               |
| 1003           | Não foi possível ler dados do banco de dados        |
| 1004           | Não foi possível gravar dados no banco de dados     |
| 1005           | Não foi possível atualizar dados no banco de dados  |
| 1006           | Não foi possível excluir dados do banco de dados    |
| 1007           | Falha na execução da transação no banco de dados    |
| 1008           | Erro de sintaxe durante a execução da consulta no banco de dados |
| 1009           | Limite de conexões simultâneas ao banco de dados excedido |
| 1010           | Tempo limite excedido durante a espera por uma resposta do banco de dados |
| 1011           | Conflito de dados detectado ao tentar modificar dados no banco de dados |
| 1012           | Não foi possível ler o arquivo especificado         |
| 1013           | Não foi possível escrever no arquivo especificado   |
| 1014           | Memória insuficiente para concluir a operação      |
| 1015           | Problema de rede detectado                          |
| 1016           | Permissões insuficientes para acessar o recurso    |
| 1017           | Configuração inválida ou ausente                   |
| 1018           | O recurso solicitado não foi encontrado            |
| 1019           | O serviço necessário está temporariamente indisponível |
| 1020           | Falha na autenticação do usuário                   |
| 1021           | O usuário não tem permissão para acessar o recurso  |
| 1022           | Os dados fornecidos não são válidos                |
| 1023           | Falha no processamento dos dados                   |
| 1024           | Não foi possível enviar o e-mail                    |
| 1025           | Falha ao decodificar os dados                      |
| 1026           | Falha ao codificar os dados                        |
| 1027           | Foi fornecido um parâmetro inválido               |
| 1028           | Uma dependência necessária está ausente            |
| 1029           | Tempo limite excedido durante a operação           |
| 2001           | Erro ao utilizar cliente para operações de banco de dados Prisma |
| 2002           | Falha na conexão com o banco de dados MongoDB       |
| 2003           | Erro ao executar uma consulta no banco de dados MongoDB |
| 3001           | Nome de usuário já existente                        |
| 3002           | Número de registro já existe                        |
| 3003           | CPF já existe                                      |
| 3004           | E-mail já existe                                   |
| 3005           | Formato de data de nascimento inválido              |
| 3006           | Função de usuário inválida                         |
| 3007           | Usuário não encontrado                             |
| 3008           | Falha ao atualizar o status do usuário             |
| 3009           | Falha ao excluir usuário                           |
| 3010           | Usuário ou senha incorretos                        |
| 3011           | CPF inválido                                       |
| 3012           | Telefone inválido                                  |
| 4000           | Você só pode se registrar se concordar com as diretrizes |
| 4001           | Diretriz não encontrada                            |
| 4002           | Tipo de diretriz inválido                          |
| 4003           | Falha ao atualizar o status da diretriz            |
| 4004           | Falha ao excluir a diretriz                        |
| 5001           | Falha ao aceitar a diretriz                        |
| 5002           | Falha na rejeição da aceitação da diretriz         |
| 5003           | Falha ao atualizar o status da aceitação da diretriz |
| 5004           | Falha ao excluir a aceitação da diretriz           |
| 6001           | Dispositivo não encontrado                        |
| 6002           | Falha ao criar dispositivo                         |
| 6003           | Falha ao atualizar dispositivo                     |
| 6004           | Falha ao excluir dispositivo                       |
| 7001           | Código de verificação não encontrado               |
| 7002           | Tipo de código de verificação inválido             |
| 7003           | Falha ao gerar código de verificação               |
| 7004           | Falha ao validar código de verificação             |
| 7005           | Falha ao atualizar status do código de verificação |
| 7006           | Falha ao excluir código de verificação             |
| 8001           | Falha na verificação de impressão digital          |
| 8002           | Falha na verificação do reCAPTCHA                  |
| 8003           | Falha na criptografia RSA                          |
| 8004           | Falha ao criar hash com Bcrypt                     |
| 8005           | Falha ao enviar e-mail                              |
| 9001           | Acesso bloqueado temporariamente                   |
| 9003           | Você não tem permissão para acessar este recurso   |

### Documentação Swagger

Para facilitar a compreensão e o uso dos endpoints da nossa aplicação, disponibilizamos uma documentação Swagger. Através dela, é possível testar todos os endpoints disponíveis de forma prática, visualizar os parâmetros necessários para cada requisição e as respostas esperadas.

Para acessar a documentação Swagger da nossa aplicação, utilize o seguinte endereço no seu navegador:

- **URL da Documentação Swagger**: `url_da_api/api`
