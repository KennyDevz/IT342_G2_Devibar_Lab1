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
import com.google.android.material.dialog.MaterialAlertDialogBuilder

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

        // New Logout Logic with Confirmation Dialog
        btnLogout.setOnClickListener {
            MaterialAlertDialogBuilder(this@ProfileActivity)
                .setTitle("Confirm Logout")
                .setMessage("Are you sure you want to leave?")
                .setNegativeButton("Cancel") { dialog, _ ->
                    dialog.dismiss()
                }
                .setPositiveButton("Yes, Logout") { _, _ ->
                    lifecycleScope.launch {
                        try {
                            RetrofitClient.instance.logout()
                        } catch (e: Exception) {
                            //
                        }

                        sharedPreferences.edit().remove("JWT_TOKEN").apply()
                        Toast.makeText(this@ProfileActivity, "Logged out successfully", Toast.LENGTH_SHORT).show()

                        val intent = Intent(this@ProfileActivity, LoginActivity::class.java)
                        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        startActivity(intent)
                        finish()
                    }
                }
                .show() 
        }

    }
}