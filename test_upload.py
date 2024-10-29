import boto3
from botocore.exceptions import NoCredentialsError

def upload_image_to_s3(file_path, bucket_name, object_name):
    # Inisialisasi klien S3
    s3_client = boto3.client('s3')
    
    try:
        # Mengunggah file dengan metadata yang diperlukan
        s3_client.upload_file(
            Filename=file_path,
            Bucket=bucket_name,
            Key=object_name,
            ExtraArgs={
                'ACL': 'public-read',
                'ContentType': 'image/jpeg',              # Set Content-Type
                'ContentDisposition': 'inline'            # Set Content-Disposition
            }
        )
        print("File berhasil diunggah dan diatur agar tidak auto-download.")
    except FileNotFoundError:
        print("File tidak ditemukan, pastikan path file benar.")
    except NoCredentialsError:
        print("Kredensial AWS tidak ditemukan.")
    except Exception as e:
        print("Terjadi kesalahan:", e)

# Contoh penggunaan
file_path = 'test.jpg'   # Ganti dengan path file .jpg yang ingin diunggah
bucket_name = 'chegg-bucket2'       # Ganti dengan nama bucket Anda
object_name = 'test.jpg'       # Nama file di S3 (bisa disesuaikan dengan folder)

upload_image_to_s3(file_path, bucket_name, object_name)
