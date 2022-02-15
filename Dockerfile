FROM nginx

COPY ./build /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html/* && \
  chown -R daemon:daemon /var/cache/nginx && \
  chown -R daemon:daemon /var/log/nginx && \
  chown -R daemon:daemon /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && \
  chown daemon:daemon /var/run/nginx.pid

ENTRYPOINT ["nginx", "-g", "daemon off;"]

USER daemon

EXPOSE 80
