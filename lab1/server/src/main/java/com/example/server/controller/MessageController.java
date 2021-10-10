package com.example.server.controller;

import com.example.server.model.SimpleMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @GetMapping("/simple")
    public SimpleMessage getSimple() {
        return new SimpleMessage("hello");
    }
}
