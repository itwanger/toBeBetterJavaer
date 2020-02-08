package com.cmower.java_demo.jackson;

import java.util.List;

public class Page {
    /**
     * pageInfo : {"pagePic":"http://example.com/content.jpg","pageName":"abc"}
     * posts : [{"likesCount":"2","nameOfPersonWhoPosted":"Jane Doe","comments":[],"post_id":"123456789012_123456789012","timeOfPost":"1234567890","actor_id":"1234567890","message":"Sounds cool. Can't wait to see it!","picOfPersonWhoPosted":"http://example.com/photo.jpg"}]
     */
    private PageInfoEntity pageInfo;
    private List<PostsEntity> posts;

    public void setPageInfo(PageInfoEntity pageInfo) {
        this.pageInfo = pageInfo;
    }

    public void setPosts(List<PostsEntity> posts) {
        this.posts = posts;
    }

    public PageInfoEntity getPageInfo() {
        return pageInfo;
    }

    public List<PostsEntity> getPosts() {
        return posts;
    }

    public class PageInfoEntity {
        /**
         * pagePic : http://example.com/content.jpg
         * pageName : abc
         */
        private String pagePic;
        private String pageName;

        public void setPagePic(String pagePic) {
            this.pagePic = pagePic;
        }

        public void setPageName(String pageName) {
            this.pageName = pageName;
        }

        public String getPagePic() {
            return pagePic;
        }

        public String getPageName() {
            return pageName;
        }
    }

    public class PostsEntity {
        /**
         * likesCount : 2
         * nameOfPersonWhoPosted : Jane Doe
         * comments : []
         * post_id : 123456789012_123456789012
         * timeOfPost : 1234567890
         * actor_id : 1234567890
         * message : Sounds cool. Can't wait to see it!
         * picOfPersonWhoPosted : http://example.com/photo.jpg
         */
        private String likesCount;
        private String nameOfPersonWhoPosted;
        private List<?> comments;
        private String post_id;
        private String timeOfPost;
        private String actor_id;
        private String message;
        private String picOfPersonWhoPosted;

        public void setLikesCount(String likesCount) {
            this.likesCount = likesCount;
        }

        public void setNameOfPersonWhoPosted(String nameOfPersonWhoPosted) {
            this.nameOfPersonWhoPosted = nameOfPersonWhoPosted;
        }

        public void setComments(List<?> comments) {
            this.comments = comments;
        }

        public void setPost_id(String post_id) {
            this.post_id = post_id;
        }

        public void setTimeOfPost(String timeOfPost) {
            this.timeOfPost = timeOfPost;
        }

        public void setActor_id(String actor_id) {
            this.actor_id = actor_id;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public void setPicOfPersonWhoPosted(String picOfPersonWhoPosted) {
            this.picOfPersonWhoPosted = picOfPersonWhoPosted;
        }

        public String getLikesCount() {
            return likesCount;
        }

        public String getNameOfPersonWhoPosted() {
            return nameOfPersonWhoPosted;
        }

        public List<?> getComments() {
            return comments;
        }

        public String getPost_id() {
            return post_id;
        }

        public String getTimeOfPost() {
            return timeOfPost;
        }

        public String getActor_id() {
            return actor_id;
        }

        public String getMessage() {
            return message;
        }

        public String getPicOfPersonWhoPosted() {
            return picOfPersonWhoPosted;
        }
    }
}
