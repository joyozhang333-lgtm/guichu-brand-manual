# 归处 HERE 品牌手册 — 部署说明

## 生产环境信息

| 项目 | 内容 |
|------|------|
| 服务器 | 腾讯云 101.35.56.146 |
| 运行端口 | 3002 |
| 进程管理 | PM2（进程ID: 2，名称: guichu-brand） |
| 代码目录 | `/var/www/guichu-brand/` |
| Nginx配置 | `/www/server/panel/vhost/nginx/guichuhere.co.conf` |
| 域名 | guichuhere.co（备案后生效） |

## 部署步骤

### 首次部署

```bash
# 1. 克隆仓库
git clone https://github.com/joyozhang333-lgtm/guichu-brand-manual.git /var/www/guichu-brand
cd /var/www/guichu-brand

# 2. 安装依赖并构建
npm install
npm run build

# 3. 用PM2启动
pm2 start dist/index.js --name guichu-brand
pm2 save
```

### 更新部署

```bash
cd /var/www/guichu-brand
git pull origin main
npm run build
pm2 restart guichu-brand
```

## Nginx 代理配置

品牌网页通过 Nginx 反向代理到 3002 端口，配置位于：
`/www/server/panel/vhost/nginx/guichuhere.co.conf`

当 `guichuhere.co` 域名备案通过后，访问 http://guichuhere.co 即可直接访问品牌手册。

## 注意事项

- 证书：目前使用 Let's Encrypt IP 证书（有效期至 2026-04-06），备案后需申请域名证书
- PM2 已配置开机自启：`pm2 startup` 已执行
