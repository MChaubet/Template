package com.juun.template.model.vm;

import lombok.*;

/**
 * View Model object for storing the user's key and password.
 */
@Builder
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeyAndPasswordVM {

    private String key;
    private String newPassword;
}
