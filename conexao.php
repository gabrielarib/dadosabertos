<?php
    //CONFIGURAÇÃO GERAL
    $servidor="localhost";
    $usuario="root";
    $senha="";
    $banco="dados_abertos";

    $pdo = new PDO ("mysql:host=$servidor;dbname=$banco,$usuario,$senha");
?>