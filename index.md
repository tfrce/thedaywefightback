---
layout: default
title: The Day We Fight Back Blog
---

<div id="home">
  <h1>Blog Posts</h1>
  <ul class="posts">
    {% for post in site.posts %}
    <article class="post">
      <p><span>{{ post.date | date_to_string }}</span> &raquo; <a href="/blog{{ post.url }}"><h2>{{ post.title }}</a></h2></p>
      <p class="content">{{ post.content }}</p>
	</article>
    {% endfor %}
  </ul>
</div>