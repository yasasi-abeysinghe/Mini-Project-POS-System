package com.example.pos.controller;

import com.example.pos.model.Item;
import com.example.pos.model.User;
import com.example.pos.model.UserRole;
import com.example.pos.repository.ItemRepository;
import com.example.pos.repository.UserRepository;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import javax.servlet.http.Cookie;
import java.util.HashSet;
import java.util.Set;


@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class ItemControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Before
    public  void setUpAuth() {
        User newUser = new User("TestFirstName", "TestLastName", "TestUser",passwordEncoder.encode("abc123"));
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(UserRole.ADMIN);
        newUser.setUserRoles(userRoles);
        userRepository.save(newUser);
    }
    @After
    public void resetDb() {

        itemRepository.deleteAll();
        userRepository.deleteAll();
    }


    private String cookie = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpZHAiLCJpYXQiOjE1NDg5OTAzNDl9.a2U18gp-dGDNsIGlug03YlX1Wi0QfLU7kJoZhR0kCfRwwVG-cjfg4WgdN_N5uxuXojlXZ3y8ZPUshHWIruxb-g";

    @Test
    public void getItemTest() throws Exception {
        Item newItem = new Item("testItem", 1.0f, 20.0f, "1");
        itemRepository.save(newItem);
        String expectedResponse = "[{\"itemName\":\"testItem\",\"quantity\":1.0,\"unitPrice\":20.0,\"orderNo\":\"1\"}]";
        final Cookie authCookie = new Cookie("AuthenticationCookie", this.cookie);
        ResultActions responseAction = mvc.perform(get("/api/auth/items").cookie(authCookie));
        String itemsString = responseAction.andReturn().getResponse().getContentAsString();
        String responseString = ("[{" + itemsString.substring(itemsString.indexOf("\"itemName")));
        Assert.assertEquals(responseString,expectedResponse);
    }


    @Test
    public void createItemTest() throws Exception {
        final Cookie authCookie = new Cookie("AuthenticationCookie", this.cookie);
        ResultActions responseAction = mvc.perform(post("/api/auth/items").cookie(authCookie));
        String itemId = responseAction.andReturn().getResponse().getContentAsString();
        Assert.assertNotNull(itemRepository.findById(itemId));
    }
}
