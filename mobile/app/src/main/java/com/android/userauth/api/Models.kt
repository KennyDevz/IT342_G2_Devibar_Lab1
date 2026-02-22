package com.android.userauth.api

data class LoginRequest(
    val username: String,
    val password: String
)

data class UserDTO(
    val username: String,
    val email: String,
    val password: String,
    val fullName: String
)

data class User(
    val id: Long,
    val username: String,
    val email: String,
    val fullName: String
)