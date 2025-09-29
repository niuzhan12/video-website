#!/bin/bash

# 阿里云OSS部署脚本
# 使用方法：./deploy.sh your-bucket-name your-region

BUCKET_NAME=$1
REGION=$2

if [ -z "$BUCKET_NAME" ] || [ -z "$REGION" ]; then
    echo "使用方法: ./deploy.sh <bucket-name> <region>"
    echo "例如: ./deploy.sh my-video-site oss-cn-hangzhou"
    exit 1
fi

echo "开始部署到阿里云OSS..."
echo "存储桶: $BUCKET_NAME"
echo "地域: $REGION"

# 检查阿里云CLI是否安装
if ! command -v aliyun &> /dev/null; then
    echo "请先安装阿里云CLI工具"
    echo "下载地址: https://help.aliyun.com/document_detail/121541.html"
    exit 1
fi

# 上传文件
echo "上传网站文件..."
aliyun oss cp index.html oss://$BUCKET_NAME/
aliyun oss cp style.css oss://$BUCKET_NAME/
aliyun oss cp script.js oss://$BUCKET_NAME/
aliyun oss cp README.md oss://$BUCKET_NAME/

# 上传视频文件夹
echo "上传视频文件..."
aliyun oss cp lbxx/ oss://$BUCKET_NAME/lbxx/ -r

# 设置文件权限
echo "设置文件权限..."
aliyun oss set-acl oss://$BUCKET_NAME/ public-read

echo "部署完成！"
echo "访问地址: http://$BUCKET_NAME.$REGION.aliyuncs.com"
echo "请确保已开启静态网站托管功能"
