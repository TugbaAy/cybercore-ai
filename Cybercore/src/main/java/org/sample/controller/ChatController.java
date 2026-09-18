package org.sample.controller;

import org.sample.model.ChatRequest;
import org.sample.model.ChatResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        String systemPrompt = "Sen 'CyberCore' adında gelişmiş bir yapay zekasın. " +
                "Kullanıcı sorularına teknik, kibar ve açıklayıcı yanıtlar ver. Türkçe cevap ver.";

        String aiMessage = chatClient.prompt()
                .system(systemPrompt)
                .user(request.message())
                .call()
                .content();

        return ResponseEntity.ok(new ChatResponse(aiMessage));
    }
}