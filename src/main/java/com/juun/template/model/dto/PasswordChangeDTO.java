package com.juun.template.model.dto;

import lombok.*;

/**
 * A DTO representing a password change required data - current and new password.
 */
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeDTO {

    private String currentPassword;
    private String newPassword;
}
