package com.android.userauth

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.android.userauth.api.RetrofitClient
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val tvWelcomeTitle = findViewById<TextView>(R.id.tvWelcomeTitle)
        val tvAvatarInitialsTop = findViewById<TextView>(R.id.tvAvatarInitialsTop)

        val sharedPreferences = getSharedPreferences("AuthPrefs", Context.MODE_PRIVATE)
        val token = sharedPreferences.getString("JWT_TOKEN", null)

        if (token != null) {
            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.instance.getProfile("Bearer $token")

                    if (response.isSuccessful && response.body() != null) {
                        val user = response.body()!!

                        val firstName = if (user.fullName.isNotEmpty()) {
                            user.fullName.split(" ")[0]
                        } else {
                            "Friend"
                        }
                        tvWelcomeTitle.text = "Hello, $firstName!"

                        if (user.fullName.isNotEmpty()) {
                            tvAvatarInitialsTop.text = user.fullName.substring(0, 1).uppercase()
                        }
                    }
                } catch (e: Exception) {
                    // Ignore network errors
                }
            }
        } else {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }

        // Click the Top Right Avatar to go to Profile Screen
        tvAvatarInitialsTop.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }
    }
}