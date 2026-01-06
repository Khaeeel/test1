<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    $files = Storage::disk('public')->files('photobooth');
    $urls = array_map(fn($f) => asset('storage/' . $f), $files);
    return view('welcome', compact('urls'));

    Route::post('/photobooth/save', function (Request $request) {
    $data = $request->input('image'); // data:image/png;base64,....
    $data = str_replace('data:image/png;base64,', '', $data);
    $data = str_replace(' ', '+', $data);
    $imageName = 'photobooth_' . time() . '.png';
    Storage::disk('public')->put('photobooth/' . $imageName, base64_decode($data));
    return response()->json(['message' => 'Saved']);
});

Route::get('/photobooth/photos', function () {
    $files = Storage::disk('public')->files('photobooth');
    $urls = array_map(fn($f) => asset('storage/' . $f), $files);
    return view('photobooth_photos', compact('urls'));
});

});
