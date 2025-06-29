package com.vedicastrology.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    // Forward /web and /web/ to /web/index.html
    @RequestMapping({"/web", "/web/"})
    public String forwardWebRoot() {
        return "forward:/web/index.html";
    }

    // Forward all /web/* (except static files) to /web/index.html
    @RequestMapping("/web/{path:[^\\.]*}")
    public String forwardWeb() {
        return "forward:/web/index.html";
    }

    // Forward /admin and /admin/ to /admin/index.html
    @RequestMapping({"/admin", "/admin/"})
    public String forwardAdminRoot() {
        return "forward:/admin/index.html";
    }

    // Forward all /admin/* (except static files) to /admin/index.html
    @RequestMapping("/admin/{path:[^\\.]*}")
    public String forwardAdmin() {
        return "forward:/admin/index.html";
    }
}
