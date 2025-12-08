package com.reciclando.services;

import static org.junit.jupiter.api.Assertions.*;

import java.nio.file.Files;
import java.nio.file.Path;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import com.reciclando.app.config.FileStorageConfig;
import com.reciclando.app.exception.FileStorageException;
import com.reciclando.app.services.FileStorageService;

public class FileStorageServiceTests {

    private static FileStorageConfig fileStorageConfig;
    private static FileStorageService fileStorageService;

    @TempDir
    static Path tempDir;

    @BeforeAll
    private static void setUp() {
        fileStorageConfig = new FileStorageConfig();
        fileStorageConfig.setUploadDir(tempDir.toString());
        fileStorageService = new FileStorageService(fileStorageConfig);
    }

    @Test
    void testShouldStoreFile_Success() throws Exception {
        byte[] content = "Old papers".getBytes();
        MockMultipartFile multipartFile = new MockMultipartFile(
                "file",
                "myImage.png",
                "image/png",
                content);

        String fileName = fileStorageService.storeFile(multipartFile);

        assertTrue(fileName.contains("myImage.png"));
        assertTrue(Files.exists(tempDir.resolve(fileName)));
        assertEquals(content.length, Files.size(tempDir.resolve(fileName)));
        assertArrayEquals(content, Files.readAllBytes(tempDir.resolve(fileName)));
    }

    @Test
    void testShouldStoreFile_Fail() throws Exception {
        byte[] content = "Old papers".getBytes();
        MockMultipartFile multipartFile = new MockMultipartFile(
                "file",
                "myImage..png",
                "image/png",
                content);
        assertThrows(FileStorageException.class, () -> {
            fileStorageService.storeFile(multipartFile);
        });
    }
}
