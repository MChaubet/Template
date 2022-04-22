package com.juun.template.mapper;

import com.juun.template.model.dto.AdminUserDTO;
import com.juun.template.model.dto.UserDTO;
import com.juun.template.model.entity.Authority;
import com.juun.template.model.entity.User;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

/**
 * Mapper for the entity {@link User} and its DTO called {@link UserDTO}.
 */
@Mapper(nullValueMappingStrategy = NullValueMappingStrategy.RETURN_NULL)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO entityToDto(User user);

    List<UserDTO> entityListToDtoList(List<User> users);

    User dtoToEntity(UserDTO userDTO);

    List<User> dtoListToEntityList(List<UserDTO> userDTOList);

    @Mappings({ @Mapping(source = "authorities", target = "authorities", qualifiedByName = "authoritiesSetToString") })
    AdminUserDTO userToAdminUserDTO(User user);

    @Mappings({ @Mapping(source = "authorities", target = "authorities", qualifiedByName = "authoritiesSetToString") })
    List<AdminUserDTO> userListToAdminUserDTOList(List<User> userList);

    @Mappings({ @Mapping(source = "authorities", target = "authorities", qualifiedByName = "authoritiesStringToSet") })
    User adminUserDTOToUser(AdminUserDTO adminUserDTO);

    @Mappings({ @Mapping(source = "authorities", target = "authorities", qualifiedByName = "authoritiesStringToSet") })
    List<User> adminUserDTOListToUserList(List<AdminUserDTO> adminUserDTOList);

    @Named("authoritiesSetToString")
    default Set<String> authoritiesSetToString(Set<Authority> authorities) {
        Set<String> authoritiesAsString = new HashSet<>();
        if (authorities != null) {
            authoritiesAsString = authorities.stream().map(Authority::getName).collect(Collectors.toSet());
        }
        return authoritiesAsString;
    }

    @Named("authoritiesStringToSet")
    default Set<Authority> authoritiesStringToSet(Set<String> authoritiesAsString) {
        Set<Authority> authorities = new HashSet<>();
        if (authoritiesAsString != null) {
            authorities =
                authoritiesAsString
                    .stream()
                    .map(string -> {
                        Authority auth = new Authority();
                        auth.setName(string);
                        return auth;
                    })
                    .collect(Collectors.toSet());
        }
        return authorities;
    }
}
