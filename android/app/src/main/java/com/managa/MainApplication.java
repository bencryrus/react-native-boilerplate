package com.managa;

import android.app.Application;
import android.content.res.Configuration;
import androidx.annotation.NonNull;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.facebook.react.views.text.ReactFontManager;

import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHostWrapper(this, new DefaultReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        return packages;
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }

      @Override
      protected boolean isNewArchEnabled() {
        return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
      }

      @Override
      protected Boolean isHermesEnabled() {
        return BuildConfig.IS_HERMES_ENABLED;
      }
  });

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    // Add fonts
    ReactFontManager.getInstance().addCustomFont(this, "Roboto Mono", R.font.roboto_mono);
    ReactFontManager.getInstance().addCustomFont(this, "Roboto", R.font.roboto);
    ReactFontManager.getInstance().addCustomFont(this, "Montserrat", R.font.montserrat);
    ReactFontManager.getInstance().addCustomFont(this, "Lexend Deca", R.font.lexend_deca);
    ReactFontManager.getInstance().addCustomFont(this, "Oxygen", R.font.oxygen);
    ReactFontManager.getInstance().addCustomFont(this, "Nunito", R.font.nunito);
    ReactFontManager.getInstance().addCustomFont(this, "Roboto", R.font.roboto);
    ReactFontManager.getInstance().addCustomFont(this, "Helvetica", R.font.helvetica);
    ReactFontManager.getInstance().addCustomFont(this, "Courier", R.font.courier);
    ReactFontManager.getInstance().addCustomFont(this, "Space Grotesk", R.font.space_grotesk);

    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }
}
