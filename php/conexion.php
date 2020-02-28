<?
    $servername = "localhost";
    $username = "webbbdo";
    $password = "#.vacaloca.#";
    $dbase = "webbbdo_otros";
    $dbs = "mysql:host=" . $servername .";dbname=" . $dbase;
    try {
        
            $db = new PDO($dbs, $username, $password);
            $db -> exec("SET CHARACTER SET utf8");
        
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
?>