package com.vedicastrology.service;

import com.vedicastrology.entity.Comment;

import java.util.List;

public interface CommentService {

    Comment createComment(Long postId, String postedBy, String content);

    List<Comment> getCommentsByPostId(Long postId);
}
