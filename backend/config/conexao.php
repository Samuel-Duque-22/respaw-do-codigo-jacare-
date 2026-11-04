<?php
/* ===========================================================================
   ARA0062 — conexão com o banco de dados
   Este arquivo começa vazio de propósito: o PHP entra no ciclo 8.

   Aqui vai ficar a conexão PDO com o banco do projeto, e é ela que os
   arquivos de dentro do backend/ vão incluir. Nada de HTML aqui: o backend
   recebe, valida e grava; quem desenha a tela é o frontend.
   =========================================================================== */
<?php
$host    = "localhost";
$banco   = "padaria_triguinho";
$usuario = "root";   // ajuste para o usuário do seu MySQL
$senha   = "";       // ajuste para a senha do seu MySQL

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$banco;charset=utf8mb4",
        $usuario,
        $senha,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    die("Não foi possível conectar ao banco de dados.");
}