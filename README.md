# React Native Cookbook

---

### 1. Create app

```bash
npx create-expo-app my-app
cd my-app
expo eject

npm install @react-navigation/drawer @react-navigation/bottom-tabs @react-navigation/native @react-navigation/native-stack axios date-fns lodash moment moment-timezone react-native-collapsible react-native-gesture-handler react-native-material-ripple react-native-reanimated react-native-safe-area-context redux react-redux redux-thunk react-native-screens react-native-modal @rneui/themed react-native-mmkv node-emoji expo-dev-client
```

- `expo-dev-client` to run on dev client with hot refresh

---

### 2. Setup fonts

[How to add custom fonts in React Native - LogRocket Blog](https://blog.logrocket.com/adding-custom-fonts-react-native/)

- 1. Copy fonts to `./assets/fonts`
- 2. Create `react-native.config.js`
    
    ```jsx
    module.exports = {
        project: {
            ios: {},
            android: {}, 
        },
        assets: ["./assets/fonts/"],
    };
    ```
    
- 3. Run `npx react-native-asset`
- 4. Run `pod install` for iOS
- 5. Copy fonts into `./android/app/src/main/res/font`
- 6. Rename fonts into `xx_regular.ttf`, `xx_italic.ttf` and `xx_bold.ttf`
- 7. Create .xml files to match font names in `./android/app/src/main/res/font`
    
    ```jsx
    <?xml version="1.0" encoding="utf-8"?>
    <font-family xmlns:app="http://schemas.android.com/apk/res-auto">
        <font app:fontStyle="normal" app:fontWeight="400" app:font="@font/xx_regular" />
        <font app:fontStyle="italic" app:fontWeight="400" app:font="@font/xx_italic"/>
        <font app:fontStyle="normal" app:fontWeight="700" app:font="@font/xx_bold" />
    </font-family>
    ```
    
- 8. Update `android/app/src/main/java/com/app_name/MainApplication.java`
    
    [https://github.com/jsamr/react-native-font-demo](https://github.com/jsamr/react-native-font-demo)
    
    ```jsx
    // Add this at the top
    import com.facebook.react.views.text.ReactFontManager;
    
    @Override
      public void onCreate() {
        super.onCreate();
    
        // Add the fonts here
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
    ```
    

---

### 3. Splash screen

[How to add a splash screen to a React Native app - The easy way](https://dev.to/lloyds-digital/how-to-add-a-splash-screen-to-a-react-native-app-the-easy-way-3ego)

- iOS
    - Convert hex to iOS RGB [[link](https://www.uicolor.io/)]
    - Update `AppDelegate.m`
        
        ```jsx
        - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
        {
          self.moduleName = @"main";
        
          // You can add your custom initial props in the dictionary below.
          // They will be passed down to the ViewController used by React Native.
          self.initialProps = @{};
        
          BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
          if (success) {
            // Modify as needed to match the main color of your splash.
            self.window.rootViewController.view.backgroundColor = [UIColor colorWithRed:0.84 green:0.25 blue:0.56 alpha:1.0];
          }
        
          return success;
        }
        ```
        
    - Update `ios/<AppName>/LaunchScreen.storyboard`
        
        ```jsx
        <?xml version="1.0" encoding="UTF-8"?>
        <document
          type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB"
          version="3.0"
          toolsVersion="16096"
          targetRuntime="iOS.CocoaTouch"
          propertyAccessControl="none"
          useAutolayout="YES"
          launchScreen="YES"
          useTraitCollections="YES"
          useSafeAreas="YES"
          colorMatched="YES"
          initialViewController="EXPO-VIEWCONTROLLER-1"
        >
          <device id="retina5_5" orientation="portrait" appearance="light"/>
          <dependencies>
            <deployment identifier="iOS"/>
            <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="16087"/>
            <capability name="Safe area layout guides" minToolsVersion="9.0"/>
            <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
          </dependencies>
          <scenes>
            <!--View Controller-->
            <scene sceneID="EXPO-SCENE-1">
              <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" autoresizesSubviews="NO" opaque="NO" clearsContextBeforeDrawing="NO" userInteractionEnabled="NO" contentMode="scaleToFill" id="1L6-XZ-uwR">
                        <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
                        <autoresizingMask key="autoresizingMask" flexibleMaxX="YES" flexibleMaxY="YES"/>
                        <viewLayoutGuide key="safeArea" id="VQL-mw-5y0"/>
                        <!-- Change the color here -->
                        <color key="backgroundColor" red="0.26" green="0.38" blue="0.93" alpha="1" colorSpace="calibratedRGB"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="EXPO-PLACEHOLDER-1" userLabel="First Responder" sceneMemberID="firstResponder"/>
              </objects>
              <point key="canvasLocation" x="140.625" y="129.4921875"/>
            </scene>
          </scenes>
          <resources>
            <image name="SplashScreen" width="414" height="736"/>
            <image name="SplashScreenBackground" width="1" height="1"/>
          </resources>
        </document>
        ```
        
- Android
    - Update `android/app/src/main/res/values/styles.xml`
        
        ```jsx
        <resources>
          <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
            <item name="android:textColor">@android:color/black</item>
            <item name="android:editTextStyle">@style/ResetEditText</item>
            <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
            <item name="android:windowIsTranslucent">false</item>
            <item name="android:windowBackground">@android:color/transparent</item>
          </style>
          <style name="ResetEditText" parent="@android:style/Widget.EditText">
            <item name="android:padding">0dp</item>
            <item name="android:textColorHint">#c8c8c8</item>
            <item name="android:textColor">@android:color/black</item>
          </style>
          <!-- Add this -->
          <style name="Theme.App.SplashScreen" parent="AppTheme">
            <item name="android:windowBackground">#4361ee</item>
          </style>
        </resources>
        ```
        
    - Update `android/app/src/main/res/values/colors.xml`
        
        ```jsx
        <resources>
          <color name="splashscreen_background">#4361ee</color>
          <color name="ic_launcher_background">#4361ee</color>
        </resources>
        ```
        

---

### 4. App name

[How to change the app name in react-native(in android and IOS):](https://dev.to/zenkoders/how-to-change-the-app-name-in-react-nativein-android-and-ios-573i)

- iOS
    - Open in xcode
    - Build settings → Packaging → Product name
    - Update info.plist → Bundle display name
- Android
    - Update `android/app/src/main/res/values/string.xml`
        
        ```jsx
        <resources>
          <string name="app_name">App name</string>
          <string name="expo_splash_screen_resize_mode" translatable="false">contain</string>
          <string name="expo_splash_screen_status_bar_translucent" translatable="false">false</string>
        </resources>
        ```
        
    - `cd android`
    - `./gradlew clean`

---

### 5. App icon

- 1. Create icon images
    
    Image provided should not have any background
    
    Download iOS + Adaptive icon option
    
    [EasyAppIcon - Create Mobile App Icon](https://easyappicon.com/)
    
- 2. Update iOS
    - Open xcode
    - Update `app_name/Images`
- 3. Update Android
    - Copy the mipmap folders into `android/app/src/main/res`

---

### 6. App link

- Resources
    
    [How to change the "Bundle Identifier" within React Native?](https://stackoverflow.com/questions/36119754/how-to-change-the-bundle-identifier-within-react-native)
    
    [How to change bundle identifier of iOS app and package name of android app within react native app](https://medium.com/@devesu/how-to-change-bundle-identifier-of-ios-app-and-package-name-of-android-app-within-react-native-app-4fbdd6679aa2)
    
- iOS
    - Xcode → General → Bundle identifier
- Android
    - Update folder structure inside “android/app/src/main/java/” folder based on your new package name e.g "com/companyName/appName"
    - Update package name inside MainActivity.java file
    - Update package name inside MainApplication.java file
    - Update package name inside /android/app/src/main/AndroidManifest.xml file
    - Update package name inside /android/app/BUCK file
    - Update package name inside /android/app/build.gradle file

---