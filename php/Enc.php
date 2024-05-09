<!-- <?php
// $data = "Hello Jack!";
// $enc_algorithm = "aes-128-gcm";
// print_r(openssl_get_cipher_methods()); //to see the list of available cipher algorithms
// $vector_len = openssl_cipher_iv_length($enc_algorithm);
// $vector = openssl_random_pseudo_bytes($vector_len);
// // echo $vector;
// $enc_data = openssl_encrypt($data,$enc_algorithm,"Joao:D",$options=0,$vector,$tag);
// echo $enc_data;
// $dec_data = openssl_decrypt($enc_data,$enc_algorithm,"Joao:D",$options=0,$vector,$tag);
// echo $dec_data;
// echo base64_encode(hash_hmac('sha2-512',"some data","simple key",TRUE));


// function encrypt($data)
// {
//     define("FIRST_KEY", base64_encode(openssl_random_pseudo_bytes(32))); // use to generate the key
//     define("SECOND_KEY", base64_encode(openssl_random_pseudo_bytes(64)));
//     $firstKey = base64_decode(FIRST_KEY);
//     $secondKey = base64_decode(SECOND_KEY);
//     $cipher_algo = "aes-256-cbc";
//     $vector_len = openssl_cipher_iv_length($cipher_algo);
//     $vector = openssl_random_pseudo_bytes($vector_len);
//     $first_enc = openssl_encrypt($data, $cipher_algo, $firstKey, OPENSSL_RAW_DATA, $vector);
//     $second_enc = hash_hmac('sha3-512', $first_enc, $secondKey, TRUE);
//     $output = base64_encode($firstKey . $secondKey . $vector . $second_enc . $first_enc);

//     return $output;
// }
// function decrypt($cipher_data)
// {
//     $mix = base64_decode($cipher_data);
//     $firstKey = substr($mix, 0, 32);
//     $secondKey = substr($mix, 32, 64);
//     $cipher_algo = "aes-256-cbc";
//     $vector_len = openssl_cipher_iv_length($cipher_algo);
//     $vector = substr($mix, 32 + 64, $vector_len);
//     $second_enc = substr($mix, 32 + 64 + $vector_len, 64);
//     $first_enc = substr($mix, 32 + 64 + $vector_len + 64);
//     $data = openssl_decrypt($first_enc, $cipher_algo, $firstKey, OPENSSL_RAW_DATA, $vector);
//     $data_hash = hash_hmac('sha3-512', $first_enc, $secondKey, TRUE);
//     if (hash_equals($second_enc, $data_hash)) {
//         return $data;
//     } else {
//         return "No Way!";
//     }
// }
// function config_enc($addr){
//     $config_data = file_get_contents($addr);
//     $config_enc = encrypt($config_data);
//     file_put_contents($addr,$config_enc);
// }
// function config_dec($addr){
//     $config_enc = file_get_contents($addr);
//     $config_dec = decrypt($config_enc);
//     file_put_contents($addr,$config_dec);
//     eval($config_dec);
// }
// config_enc("./config.php");
// echo encrypt("Some random dummy data!");
// echo decrypt("GDAQ2gHv38F4WakejvzcKExy3HtehesAAQusHXCRk7x9kfpfr27o0/xYG5gJGL5+yLLrgnhMagp9VgEFebN9rocPg9FNtulpzojpBsYfGKtgdTkFjZ5Wzp+wt7plqYaHbrFp63hHJAPIPQJbmvAPa3J75aCBfs8Ljo/oWUUTLWSbsFQGWkAdDcrEqRKPNPQGc8AUkbyk0+wwCMgPkeIaa9KOd7MHMZFv+wrn6k3s97HiacrtjtPb+mUxLiTilzOqUCVnJeYS8lkS3pWgrUP7QA==");
// echo decrypt("Hello Evelin!!")

?> -->