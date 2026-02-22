package com.android.userauth.api

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface AuthApi {

    @POST("auth/register")
    suspend fun register(@Body request: UserDTO): Response<Map<String, String>>

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<Map<String, String>>

    @GET("user/me")
    suspend fun getProfile(@Header("Authorization") token: String): Response<User>

    @POST("auth/logout")
    suspend fun logout(): Response<Map<String, String>>
}