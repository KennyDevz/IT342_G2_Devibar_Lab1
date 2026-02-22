package com.android.userauth

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.android.userauth.api.RetrofitClient
import kotlinx.coroutines.launch

class ProfileActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val tvFullName = findViewById<TextView>(R.id.tvFullName)
        val tvUsername = findViewById<TextView>(R.id.tvUsername)
        val tvEmail = findViewById<TextView>(R.id.tvEmail)
        val tvAvatarInitials = findViewById<TextView>(R.id.tvAvatarInitials)
        val btnBack = findViewById<Button>(R.id.btnBack)
        val btnLogout = findViewById<Button>(R.id.btnLogout) 

        val sharedPreferences = getSharedPreferences("AuthPrefs", Context.MODE_PRIVATE)
        val token = sharedPreferences.getString("JWT_TOKEN", null)

        if (token != null) {
            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.instance.getProfile("Bearer $token")
                    if (response.isSuccessful && response.body() != null) {
                        val user = response.body()!!
                        tvFullName.text = user.fullName
                        tvUsername.text = "@${user.username}"
                        tvEmail.text = user.email
                        if (user.fullName.isNotEmpty()) {
                            tvAvatarInitials.text = user.fullName.substring(0, 1).uppercase()
                        }
                    } else {
                        Toast.makeText(this@ProfileActivity, "Failed to load profile", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@ProfileActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }

        // Just close this screen to go back to Dashboard
        btnBack.setOnClickListener {
            finish()
        }


    }
}