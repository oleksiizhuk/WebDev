<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header("location:index.php");
    die();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'autoloader.php';

$config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'config.php';

use app\Database;
use app\Json;
use app\Api;

if (isset($_GET['function'])) {
    if ($_GET['function'] === 'Database') {
        try {
            $weatherDB = new Database();
            $weatherDB->getValue();
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        exit;
    }

    if ($_GET['function'] === 'Json') {
        try {
            $weatherJSON = new Json($config['json']);
            $weatherJSON->getValue();
        } catch (Exception $exception) {
            die($exception->getMessage());
        }
        exit;
    }

    if ($_GET['function'] === 'Api') {
        try {
            $weatherApi = new Api();
            $weatherApi->getValue();
        } catch (Exception $exception) {
            die($exception->getMessage());
        }
        exit;
    }

}