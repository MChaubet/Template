package com.juun.template.model.vm;

import com.juun.template.model.dto.AdminUserDTO;
import javax.validation.constraints.Size;
import lombok.*;

/**
 * View Model extending the AdminUserDTO, which is meant to be used in the user management UI.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManagedUserVM extends AdminUserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;
    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;
}
