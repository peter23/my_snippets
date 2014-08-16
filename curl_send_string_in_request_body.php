<?php
	
	$request = 'PUT DATA';
	$url = 'http://example.com/';
	
	$curl = curl_init($url);
	
	// we can use any method
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
	
	// CURLOPT_POSTFIELDS works without other options
	curl_setopt($curl, CURLOPT_POSTFIELDS, $request);
	
	// curl_exec et al.
	
?>