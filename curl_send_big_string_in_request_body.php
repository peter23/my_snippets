<?php
	
	// This is useful for sending big strings, because
	// php://temp create temp file on disk in case of insufficient memory
	
	$request = 'BIG POST DATA';
	$url = 'http://example.com/';
	
	$curl = curl_init($url);
	
	$temp = fopen('php://temp', 'w');
	fwrite($temp, $request);
	fseek($temp, 0);
	
	// CURLOPT_INFILE* works only with this option
	curl_setopt($curl, CURLOPT_PUT, true);
	
	// but we can use any method
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
	
	curl_setopt($curl, CURLOPT_INFILE, $temp);
	curl_setopt($curl, CURLOPT_INFILESIZE, strlen($request));
	
	// curl_exec et al.
	
?>