<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); //Проверка подключено ли ядро Битрикс, необходимо добавлять, если файла не должен вызываться напрямую через браузер?>
<?use Bitrix\Main\Page\Asset; //Класс для подключения стилей, скриптов?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?$APPLICATION->ShowHead();?>
    <meta charset=<?=LANG_CHARSET;?>>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?$APPLICATION->showTitle();?></title>
    <?Asset::getInstance()->addCss(SITE_TEMPLATE_PATH.'/css/style.css');?>
    <?CJSCore::Init(['jquery']);?>
</head>
<body>