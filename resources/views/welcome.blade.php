<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel + React</title>

    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>
<body>
    <h1>Laravel Welcome Page</h1>
<h2>Saved Photos</h2>
@foreach($urls as $url)
    <img src="{{ $url }}" style="width:200px; margin:10px; border:1px solid black;">
@endforeach

    <!-- React mounts here -->
    <div id="root"></div>
</body>
</html>
