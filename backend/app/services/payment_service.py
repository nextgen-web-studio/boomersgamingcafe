import razorpay
import hmac
import hashlib
from app.config import settings

class PaymentService:
    def __init__(self):
        self.client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

    def create_order(self, amount_paise: int, currency: str, receipt: str, notes: dict = None) -> dict:
        data = {
            "amount": amount_paise,
            "currency": currency,
            "receipt": receipt,
            "notes": notes or {}
        }
        return self.client.order.create(data=data)

    def verify_signature(self, razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str) -> bool:
        msg = f"{razorpay_order_id}|{razorpay_payment_id}"
        secret = settings.RAZORPAY_KEY_SECRET.encode('utf-8')
        generated_signature = hmac.new(secret, msg.encode('utf-8'), hashlib.sha256).hexdigest()
        return hmac.compare_digest(generated_signature, razorpay_signature)

    def get_payment(self, razorpay_payment_id: str) -> dict:
        return self.client.payment.fetch(razorpay_payment_id)
