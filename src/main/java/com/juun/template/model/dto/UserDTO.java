package com.juun.template.model.dto;

import com.juun.template.model.entity.User;
import lombok.*;

/**
 * A DTO representing a user, with only the public attributes.
 */
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String login;
    private String motDePasse;

    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
    }
}
