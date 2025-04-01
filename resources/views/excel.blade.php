<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.css">
    <title>IMPORT APPLICANT EXCEL DATA FILE</title>
</head>
<body>
    <form action="" method="post" enctype="multipart/form-data" >
        @csrf
        <input type="file" name="excel_applicant_data" id="file"  >
        <input type="submit" value="Submit" >
    </form>
</body>
</html>