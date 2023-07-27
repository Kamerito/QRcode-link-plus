// カメラの設定
const video = document.getElementById('qr-video');

// カメラを起動してQRコードをスキャンする関数
function startQrScanner() {
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
      requestAnimationFrame(scanQrCode);
    })
    .catch((error) => {
      console.error('カメラを起動できませんでした：', error);
    });
}

// QRコードをスキャンする関数
function scanQrCode() {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, canvas.width, canvas.height);

  if (code) {
    const qrResult = document.getElementById('qr-result');
    qrResult.innerHTML = `スキャン結果: ${code.data}`;

    // スキャンしたQRコードのデータをリンクに適用する
    const link = `https://keyaki.com/${code.data}`;
    window.open(link, '_blank');
  }

  requestAnimationFrame(scanQrCode);
}

// ページ読み込み時にカメラを起動
window.addEventListener('DOMContentLoaded', startQrScanner);
