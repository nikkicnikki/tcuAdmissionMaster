<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>IMPORT APPLICANT EXCEL DATA FILE</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-8 mt-5">
                @if (session('success'))
                    <div class="alert alert-success">{{ session('success') }}</div>
                @endif
                <div class="card">
                    <div class="card-header">
                        <h4 class="">Import Applicant Data</h4>            
                    </div>
                    <div class="card-body">
                        <form action="{{ url("/excel") }}" method="post" enctype="multipart/form-data" >
                            @csrf
                            <div class="input-group">
                                <input type="file" name="excel_applicant_data" class="form-control" >
                                <button type="submit" class="btn btn-primary">Import</button>
                                
                            </div>
                        </form>
                    </div>
                    <a class="btn btn-secondary " data-bs-toggle="offcanvas" href="{{ url("/applicant")}}" role="button" title="BACK TO APPLICANT FORM">
                        << BACK
                    </a>
                </div>
                
            </div>
        </div>
    </div>
</body>
</html>