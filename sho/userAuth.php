<?php
require("./config.php");
require("./Functions.php");

class UserAuth {
    public function login($email, $password) {
        $user = new User($email);
        try {
            // 사용자 인증 처리
            $sessionId = $user->authenticate($password);
            // 로그인 성공 시 세션 ID 반환
            return json_encode(["success" => true, "sessionId" => $sessionId, "userInfo" => $user->display_info()]);
        } catch (Exception $e) {
            // 로그인 실패 시 예외 처리
            return json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }
}

// 사용자 인증 클래스의 인스턴스 생성
$userAuth = new UserAuth();

// POST 요청으로 받은 이메일과 비밀번호를 사용하여 로그인 시도
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    echo $userAuth->login($request->email, $request->password);
}
?>